import { Shell } from "~/components/ui/shell";
import dynamic from "next/dynamic";

const HeroSSR = dynamic(() => import("~/components/hero/hero"));

const HeroPage = () => (
  <Shell>
    <HeroSSR />
  </Shell>
);

export default HeroPage;
