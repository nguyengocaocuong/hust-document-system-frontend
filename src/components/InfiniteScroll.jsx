import React from "react";
import Infinite from "react-infinite-scroll-component";
import { useState } from "react";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

function InfiniteScroll({items}) {
  const [scrollState, setScrollState] = useState({
    total: 100,
    items: Array.from({ length: 50 }),
    hasMore: true,
  });
  const featchMoreData = () => {
    if (scrollState.items.length >= 500) {
      setScrollState({ hasMore: false });
      return;
    }

    setTimeout(() => {
      setScrollState({
        total: 500,
        items: scrollState.items.concat(Array.from({ length: 20 })),
        hasMore: true,
      });
    }, 500);
  };
  return (
    <Infinite
      dataLength={scrollState.items.length}
      hasMore={scrollState.hasMore}
      next={featchMoreData}
      loader={<h1>Loadding...</h1>}
      endMessage={<p>Hết rồi</p>}
      style={{ height: "70vh" }}
    >
      {scrollState.items.map((i, index) => (
        <div style={style} key={index}>
          div - #{index}
        </div>
      ))}
    </Infinite>
  );
}

export default InfiniteScroll;
