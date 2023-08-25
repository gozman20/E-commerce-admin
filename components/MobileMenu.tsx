"use client";
import { Fragment, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";

import { Menu, X } from "lucide-react";

import { Button } from "./ui/button";
import { useParams, usePathname } from "next/navigation";

import Link from "next/link";
import { cn } from "@/lib/utils";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Home",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboard",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Category",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Product",
      active: pathname === `/${params.storeId}/product`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
  return (
    <>
      <div onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
        <Menu size={25} />
      </div>
      <Transition appear show={open} as="div">
        <Dialog
          open={open}
          as="div"
          className="relative z-40 lg:hidden"
          onClose={onClose}
        >
          {/* Background color and opacity */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300 "
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          {/* Dialog position */}
          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300 "
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="relative ml-auto flex h-full
               w-full max-w-[250px] flex-col 
                bg-white py-4 pb-6 shadow-xl"
              >
                {/* Close button */}
                <div className="flex items-center justify-end px-4">
                  <X size={25} onClick={onClose} />
                </div>
                <nav className="flex flex-col p-6 pt-8 gap-y-4">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        route.active
                          ? "text-dark dark:text-white"
                          : "text-muted-foreground"
                      )}
                    >
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MobileMenu;
