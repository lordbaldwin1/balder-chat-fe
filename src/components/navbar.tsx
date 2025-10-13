import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ListIcon } from "lucide-react";

export default function Navbar() {
  return (
    <div className="mb-12 flex flex-row items-center justify-end gap-4 sm:justify-between">
      {/* Desktop Navigation */}
      <div className="items hidden flex-wrap gap-4 sm:flex">
        <Link
          href={"/"}
          className="hover:text-accent group flex items-center transition-all duration-200"
        >
          <span>home</span>
        </Link>
        <Link
          href={"/rooms"}
          className="hover:text-accent group flex items-center transition-all duration-200"
        >
          <span>rooms</span>
        </Link>
      </div>

      {/* Desktop Theme Toggle */}
      <div className="hidden sm:block">
        <ThemeToggle />
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="flex justify-end sm:hidden">
        <Sheet>
          <SheetTrigger asChild className="-mb-4">
            <button className="hover:text-accent transition-colors">
              <ListIcon size={30} />
              <span className="sr-only">Open menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>navigation</SheetTitle>
              <SheetDescription>tap the links to navigate.</SheetDescription>
            </SheetHeader>
            <div className="ml-6 flex flex-col gap-6">
              <SheetClose asChild>
                <Link
                  href={"/"}
                  className="hover:text-accent group flex items-center transition-all duration-200"
                >
                  <span>home</span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href={"/rooms"}
                  className="hover:text-accent group flex items-center transition-all duration-200"
                >
                  <span>rooms</span>
                </Link>
              </SheetClose>
              <div>
                <ThemeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
