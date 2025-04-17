import React from "react";

const ProductPreview = ({ entry, widgetFor }) => {
  const title = entry.getIn(["data", "title"]);
  const date = entry.getIn(["data", "date"]);
  const readingTime = entry.getIn(["data", "readingTime"]);
  const description = entry.getIn(["data", "description"]);
  const image = entry.getIn(["data", "image"]);
  const getAsset = typeof window !== 'undefined' && window.CMS && window.CMS.getAsset;

  return (
    <div className="mw6 center ph3 pv4">
      <h1 className="f2 lh-title b mb3">{title}</h1>
      <div className="flex justify-between grey-3">
        <p>{date}</p>
        <p>阅读时间 {readingTime} 分钟</p>
      </div>
      <div className="cms mw6">
        <p className="f4 lh-copy">{description}</p>
        {image && (
          <div className="mb4">
            <img
              src={getAsset ? getAsset(image) : image}
              alt=""
              className="center db mb3 w-100"
              style={{ width: "240px" }}
            />
          </div>
        )}
        <div>{widgetFor && widgetFor("body")}</div>
      </div>
    </div>
  );
};

export default ProductPreview;
