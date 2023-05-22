import React, { useEffect } from "react";
import { useQuery, useInfiniteQuery } from "react-query";
import axios from "axios";
import Card from "../component/Card";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
  });
  const fetchPhotos = async ({ pageParam = 1 }) => {
    const url = `https://rickandmortyapi.com/api/character?page=${pageParam}`;
    const response = await axios.get(url);
    return response.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery("photos", fetchPhotos, {
    getNextPageParam: (lastPage) =>
      lastPage.info.next ? lastPage.info.next.split("=")[1] : undefined,
  });
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  if (isError) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const allPhotos = data?.pages.flatMap((page) => page.results) || [];
  return (
    <div className="w-full  flex flex-col justify-center gap-10 items-center">
      {allPhotos.map((photo) => (
        <Card
          image={photo.image}
          name={photo.name}
          gender={photo.gender}
          status={photo.status}
        />
      ))}
      <div ref={inViewRef} />
      {isFetchingNextPage && (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default Home;
