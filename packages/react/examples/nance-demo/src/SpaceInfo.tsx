import { useSpaceInfo } from '@nance/nance-hooks';

export default function SpaceInfo() {
  const { data, isLoading, error } = useSpaceInfo({ space: "juicebox" });

  return (
    <p>{isLoading ? "loading" : data?.data?.name}</p>
  )
}
