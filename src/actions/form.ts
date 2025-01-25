"use server";

import prisma from "@/lib/prisma";
import { formSchema, FormSchemaType } from "@/schema/Form";
import { currentUser } from "@clerk/nextjs/server";
import { use } from "react";

class UserNotFound extends Error {}

export async function GetFromStats() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFound();
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits ?? 0;
  const submissions = stats._sum.submissions ?? 0;

  let submissionsRate = 0;

  if (visits > 0) {
    submissionsRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionsRate;

  return {
    visits,
    submissions,
    submissionsRate,
    bounceRate,
  };
}

export async function CreateForm(data: FormSchemaType) {
  const validation = formSchema.safeParse(data);

  if (!validation.success) {
    throw new Error("Invalid form data");
  }

  const user = await currentUser();
  if (!user) {
    throw new UserNotFound();
  }

  const form = await prisma.form.create({
    data: {
      ...data,
      userId: user.id,
    },
  });

  if (!form) {
    throw new Error("Form not created");
  }
  return form.id;
}

export async function GetForms() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFound();
  }

  return await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function GetFormById(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFound();
  }

  const form = await prisma.form.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!form) {
    throw new Error("Form not found");
  }

  return form;
}

export async function SaveFormContent(id: number, jsonContent: string) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFound();
  }

  const form = await prisma.form.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!form) {
    throw new Error("Form not found");
  }

  await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content: jsonContent,
    },
  });
}

export async function PublishForm(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFound();
  }

  const form = await prisma.form.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!form) {
    throw new Error("Form not found");
  }

  await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      published: true,
    },
  });
}

export async function GetFormContentById(formId: string) {
  return await prisma.form.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareUrl: formId,
    },
  });
}

export async function SubmitForm(formId: string, jsonContent: string) {
  await prisma.form.update({
    data: {
      submissions: {
        increment: 1,
      },
      FormSubmissions: {
        create: {
          content: jsonContent,
        },
      },
    },
    where: {
      shareUrl: formId,
      published: true,
    },
  });
}

export async function GetFormSubmissions(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFound();
  }
  return await prisma.form.findUnique({
    where: {
      id,
      userId: user.id,
    },
    include: {
      FormSubmissions: true,
    },
  });
}
