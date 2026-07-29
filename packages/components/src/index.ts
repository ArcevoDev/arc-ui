/**
 * @arc-ui/components — Styled shadcn-equivalent UI components
 *
 * These are Layer 2 components: Radix primitives + Alpha Palette styling.
 * No business logic, just polished, accessible UI.
 *
 * Usage:
 *   import { Button, Card, Input } from "@arc-ui/components";
 *   import "@arc-ui/components/tokens.css";
 */

export { cn } from "./utils.js";

export { type ButtonProps, Button, buttonVariants } from "./ui/button.js";

export { type InputProps, Input } from "./ui/input.js";

export { Label } from "./ui/label.js";

export { type BadgeProps, Badge, badgeVariants } from "./ui/badge.js";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card.js";

export { Separator } from "./ui/separator.js";

export { Skeleton } from "./ui/skeleton.js";

export { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar.js";

export { Checkbox } from "./ui/checkbox.js";

export { Switch } from "./ui/switch.js";

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog.js";

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "./ui/select.js";

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from "./ui/popover.js";

export { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs.js";

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./ui/tooltip.js";

export { Slider } from "./ui/slider.js";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "./ui/dropdown-menu.js";

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet.js";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./ui/table.js";

export { Textarea } from "./ui/textarea.js";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./ui/breadcrumb.js";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "./ui/pagination.js";

export { Progress } from "./ui/progress.js";

export { ScrollArea, ScrollBar } from "./ui/scroll-area.js";

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./ui/input-otp.js";
