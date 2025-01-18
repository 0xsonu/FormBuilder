"use server";

import prisma from "@/lib/prisma";
import { formSchema, FormSchemaType } from "@/schema/Form";
import { currentUser } from "@clerk/nextjs/server";

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
