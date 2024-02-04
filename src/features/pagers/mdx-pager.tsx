import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import type { Post } from "content-layer/generated";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

type PostWithRequiredFields = Pick<Post, "title" | "slug">;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  currentItem: PostWithRequiredFields;
  allItems: PostWithRequiredFields[];
  as?: React.ElementType;
}

const MdxPager = ({ as: Comp = "nav", currentItem, allItems, className, ...props }: Props) => {
  const pager = getPager(currentItem, allItems);

  if (!pager) return null;

  return (
    <Comp className={cn("flex flex-row items-center justify-between", className)} {...props}>
      {pager?.prev && (
        <Link
          aria-label={pager.prev.title.toLowerCase()}
          href={pager.prev.slug}
          className={cn(buttonVariants({ variant: "ghost" }), "truncate md:p-0")}>
          <ChevronLeftIcon className="mr-2 size-4" aria-hidden="true" />
          <span className={cn("md:block", pager.next && "hidden")}>{pager.prev.title}</span>
        </Link>
      )}
      {pager?.next && (
        <Link
          aria-label={pager.next.title.toLowerCase()}
          href={pager.next.slug}
          className={cn(buttonVariants({ variant: "ghost" }), "truncate md:ml-auto md:p-0")}>
          <span className={cn("md:block", pager.prev && "hidden")}>{pager.next.title}</span>
          <ChevronRightIcon className="ml-2 size-4" aria-hidden="true" />
        </Link>
      )}
    </Comp>
  );
};

const getPager = (
  currentItem: PostWithRequiredFields,
  allItems: PostWithRequiredFields[]
): {
  prev: PostWithRequiredFields | null;
  next: PostWithRequiredFields | null;
} => {
  const flattenedLinks = allItems.flat();
  const activeIndex = flattenedLinks.findIndex((link) => currentItem.slug === link?.slug);
  const prev = (activeIndex !== 0 ? flattenedLinks.at(activeIndex - 1) : flattenedLinks.at(-1)) ?? null;
  const next =
    (activeIndex !== flattenedLinks.length - 1 ? flattenedLinks.at(activeIndex + 1) : flattenedLinks.at(0)) ??
    null;
  return {
    prev,
    next,
  };
};

export { getPager };
export default MdxPager;
