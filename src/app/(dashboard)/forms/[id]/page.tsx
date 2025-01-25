import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/Editor/FormBuilder";
import FormLinkShare from "@/components/FormLinkShare";
import VisitButton from "@/components/VisitButton";
import React from "react";
import { StatsCard } from "../../page";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import SubmissionsTable from "@/components/SubmissionsTable";

export default async function FormDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const form = await GetFormById(Number(id));
  if (!form) {
    throw new Error("Form not found");
  }

  const { visits, submissions } = form;
  let submissionsRate = 0;
  if (visits > 0) {
    submissionsRate = (submissions / visits) * 100;
  }
  const bounceRate = 100 - submissionsRate;

  return (
    <>
      <div className="py-10 border-muted border-b ">
        <div className="flex justify-between container mx-auto">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitButton shareUrl={form.shareUrl} />
        </div>
      </div>
      <div className="py-4 border-b border-muted">
        <div className="container flex gap-2 items-center justify-between mx-auto">
          <FormLinkShare shareUrl={form.shareUrl} />
        </div>
      </div>
      <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container mx-auto">
        <StatsCard
          title="Total Visits"
          icon={<LuView className="text-blue-600" />}
          helperText="All time form visits"
          value={visits.toLocaleString() ?? ""}
          loading={false}
          className="shadow-md shadow-blue-600"
        />
        <StatsCard
          title="Total Submissions"
          icon={<FaWpforms className="text-yellow-600" />}
          helperText="All time form submissions"
          value={submissions.toLocaleString() ?? ""}
          loading={false}
          className="shadow-md shadow-yellow-600"
        />
        <StatsCard
          title="Submissions Rate"
          icon={<HiCursorClick className="text-green-600" />}
          helperText="Visits that resulted in a submission"
          value={submissionsRate.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-md shadow-green-600"
        />
        <StatsCard
          title="Bounce Rate"
          icon={<TbArrowBounce className="text-red-600" />}
          helperText="Visits that left without submitting"
          value={bounceRate.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-md shadow-red-600"
        />
      </div>
      <div className="container mx-auto pt-10">
        <SubmissionsTable formId={form.id} />
      </div>
    </>
  );
}
