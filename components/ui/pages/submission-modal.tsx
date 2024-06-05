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
    <div className="flex justify-center items-center min-h-screen overflow-auto">
      <Dialog>
        <DialogTrigger>
          Send Message
        </DialogTrigger>
        <DialogContent className="w-full max-w-md mx-4 my-6 p-6 bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>Message Zaid.</DialogTitle>
            <DialogDescription>
              Fill out the form with your request.
            </DialogDescription>
          </DialogHeader>
          <SubmissionForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubmissionModal;
