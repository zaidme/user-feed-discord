"use client";

import React, { useState } from "react";
import { Form } from "../form";
import { Button } from "../button";
import { generateForm } from "@/lib/form";
import { z } from "zod";
import { Input } from "../input";
import { useToast } from "@/components/ui/use-toast";
import { sendDiscordMessage } from "@/app/_actions/discord";
import Editor from "../editor";
import StarRating from "./star-rating";

const stripHtmlTags = (str: string) => {
  if (typeof str === "string") {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  }
  return str;
};

type SubmissionFormProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubmissionForm: React.FC<SubmissionFormProps> = ({ setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { form, schema } = generateForm({
    schema: z.object({
      name: z.string().min(1),
      editor: z.string().min(5),
      rating: z.number().min(1, { message: "First Name is required" }),
    }),
  });

  const { toast } = useToast();

  type FormInference = z.infer<typeof schema>;

  const onSubmit = async (data: FormInference) => {
    setLoading(true);
    toast({
      title: "Success!",
      description: `Welcome to the demo ${data.name}!`,
    });
    console.log(data);

    const cleanedData = {
      ...data,
      editor: stripHtmlTags(data.editor),
    };
    await sendDiscordMessage(cleanedData);
    setOpen(false);
    setLoading(false);
  };

  return (
    <div className="overflow-auto">
      <Form
        form={form}
        onSubmit={form.handleSubmit(onSubmit)}
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground space-y-4 overflow-auto"
      >
        <Input label="Name" type="name" field="name" control={form.control} />

        <StarRating label="Priority" control={form.control} name="rating" />

        <Editor label="Request Details" field="editor" control={form.control} />

        <div className="flex space-x-2">
          <Button loading={loading} type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SubmissionForm;
