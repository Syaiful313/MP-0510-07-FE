import ExplorePage from "@/features/explore";
import { getEventsFromServer } from "@/lib/server-events";

interface ExploreSearchParams {
  search?: string | string[];
  category?: string | string[];
}

const Explore = async ({
  searchParams,
}: {
  searchParams: Promise<ExploreSearchParams>;
}) => {
  const params = await searchParams;
  const search = typeof params.search === "string" ? params.search : "";
  const category = typeof params.category === "string" ? params.category : "";
  const data = await getEventsFromServer({
    page: 1,
    take: 10,
    search,
    category,
  }).catch(() => null);

  return <ExplorePage data={data} search={search} category={category} />;
};

export default Explore;
