import { GetFormSubmissions } from "@/actions/form";
import React, { ReactNode } from "react";
import { ElementsType, FormElementInstance } from "./Editor/FormElements";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { formatDistance } from "date-fns";

type Row = {
  [key: string]: string;
} & { submittedAt: Date };

export default async function SubmissionsTable({ formId }: { formId: number }) {
  const forms = await GetFormSubmissions(formId);
  if (!forms) {
    throw new Error("Form not found");
  }

  const formElements = JSON.parse(forms.content) as FormElementInstance[];

  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TextField":
        columns.push({
          id: element.id,
          label: element.properties?.label,
          required: element.properties?.required,
          type: element.type,
        });
        break;
      default:
        break;
    }
  });

  const rows: Row[] = [];
  forms.FormSubmissions.map((submission) => {
    const submissionContent = JSON.parse(submission.content);
    rows.push({
      ...submissionContent,
      submittedAt: submission.createdAt,
    });
  });

  return (
    <>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className="uppercase">
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="text-muted-foreground text-right uppercase">
                Submitted at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                {columns.map((column) => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  />
                ))}
                <TableCell className="text-right text-muted-foreground">
                  {formatDistance(new Date(row.submittedAt), new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  let node: ReactNode = value;
  return <TableCell>{node}</TableCell>;
}
