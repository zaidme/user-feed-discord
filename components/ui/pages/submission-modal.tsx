"use client";

import React from "react";
import SubmissionForm from "./submission-form";
import { Button } from "../button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../dialog";

const SubmissionModal = () => {
  return (
	<div className="flex justify-center items-center h-screen">
    <div className="flex flex-wrap items-start gap-4 overflow-auto py-10">
      <Dialog>
        <DialogTrigger><Button> Open </Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <SubmissionForm />
        </DialogContent>
      </Dialog>
    </div>
	</div>
  );
};

export default SubmissionModal;
