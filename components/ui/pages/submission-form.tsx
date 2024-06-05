"use client";

import React from "react";
import { Form } from "../form";
import { Button } from "../button";
import { generateForm } from "@/lib/form";
import { z } from "zod";
import { Input } from "../input";
import { useToast } from "@/components/ui/use-toast";
import { sendDiscordMessage } from "@/app/_actions/discord";
import Editor from "../editor";

const stripHtmlTags = (str: string) => {
  if (typeof str === "string") {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  }
  return str;
};

const SubmissionForm = () => {
  const { form, schema } = generateForm({
    schema: z.object({
      name: z.string().min(1),
      email: z.string().email("Please enter a valid email"),
      editor: z.string().min(20),
    }),
  });

  const { toast } = useToast();

  type FormInference = z.infer<typeof schema>;

  const onSubmit = async (data: FormInference) => {
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
  };

  return (
    <div>
      <p className="mb-5">Ughhghgh</p>
      <Form
        form={form}
        onSubmit={form.handleSubmit(onSubmit)}
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground space-y-4"
      >
        <Input
          label="Name"
          type="name"
          field="name"
          control={form.control}
          placeholder="Paul Atreides"
        />
        <Input
          label="Email"
          field="email"
          control={form.control}
          placeholder="paul@gmail.com"
        />
        <Editor
          label="Type a long message"
          field="editor"
          control={form.control}
        />

        <div className="flex space-x-2">
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  );
};

export default SubmissionForm;
