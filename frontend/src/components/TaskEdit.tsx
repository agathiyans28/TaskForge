import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { updateTasks } from "@/store/taskSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useWindowSize } from "@/app/hooks/useWindowSize";

// import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";

export function TaskEdit({ id, title }: { id: string; title: string }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    dispatch(updateTasks({ id, title: formData.get("title") as string }));
    setOpen(false);
  };

  const { width } = useWindowSize();
  const isDesktop = width && width > 768;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit task</DialogTitle>
            <DialogDescription>
              Make changes to your task here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
          <EditFrom onSubmit={onSubmit} title={title} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={"secondary"}>Edit</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit task</DrawerTitle>
          <DrawerDescription>
            Make changes to your task here. Click save when youre done.
          </DrawerDescription>
        </DrawerHeader>
        <EditFrom onSubmit={onSubmit} title={title} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function EditFrom({
  onSubmit,
  title,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
}) {
  return (
    <form className={cn("grid items-start gap-4 px-4")} onSubmit={onSubmit}>
      <Input type="text" id="title" name="title" defaultValue={title} />
      <Button type="submit">Save changes</Button>
    </form>
  );
}
