import { allAuthors, allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import "~/styles/mdx.css";
import getPostFromParams from "~/actions/get-post-from-params";
import increment from "~/actions/increment";
import Post from "~/components/blog/post";
import env from "~/env.mjs";
import { absoluteUrl } from "~/lib/utils";
import { type Metadata } from "next";
import { cache } from "react";

interface Props {
  params: {
    slug: string[];
  };
}

const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const post = await getPostFromParams(params);
  const url = new URL(env.NEXT_PUBLIC_APP_URL);

  if (!post) {
    return {
      metadataBase: url,
      title: "Blog doesn't exist",
      description: "The blog you are looking for does not exist.",
      openGraph: {
        title: "Blog doesn't exist",
        description: "The blog you are looking for does not exist.",
        type: "website",
        url,
      },
      twitter: {
        card: "summary",
        title: "Blog doesn't exist",
        description: "The blog you are looking for does not exist.",
      },
    };
  }

  const ogUrl = new URL(`${env.NEXT_PUBLIC_APP_URL}/api/og`);
  ogUrl.searchParams.set("title", post.title);

  return {
    metadataBase: url,
    title: post.title,
    description: post.description,
    authors: post.authors.map((author) => ({
      name: author,
    })),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: absoluteUrl(post.slug),
      images: [
        {
          url: ogUrl.toString(),
          alt: post.title,
          width: 1920,
          height: 1080,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()],
    },
  };
};

const incrementViews = cache(increment);

const PostPage = async ({ params }: Props) => {
  const post = await getPostFromParams(params);

  if (!post) return notFound();

  const authors = post.authors.map((author) =>
    allAuthors.find((a) => a.title === author?.replace(/\r$/, ""))
  );

  return <Post post={post} authors={authors} incrementViews={incrementViews} />;
};

export { generateMetadata };
export default PostPage;
