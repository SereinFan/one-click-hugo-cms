import React from "react";
import format from "date-fns/format";

export default class PostPreview extends React.Component {
  render() {
    const { entry, widgetFor, getAsset } = this.props;

    // 获取数据并添加防御性检查
    const title = entry.getIn(["data", "title"]) || "Untitled";
    const description = entry.getIn(["data", "description"]) || "No description available.";
    const date = entry.getIn(["data", "date"]) ? format(entry.getIn(["data", "date"]), "iii, MMM d, yyyy") : "No date";
    const image = entry.getIn(["data", "image"]) ? getAsset(entry.getIn(["data", "image"])) : null;
    const categories = entry.getIn(["data", "categories"]) || [];

    return (
      <div className="ph3 bg-off-white">
        <div className="center mw6 pv3">
          {/* 页面标题 */}
          <h1 className="f2 lh-title b mb3">{title}</h1>

          {/* 分类标签 */}
          {categories.length > 0 ? (
            <div className="tags grey-3 pb3">
              <strong>Categories:</strong>
              {categories.map((category, index) => (
                <a key={index} href={`/categories/${category}`} className="link grey-3 ph2">
                  {category}
                </a>
              ))}
            </div>
          ) : (
            <div className="tags grey-3 pb3">
              <strong>Categories:</strong>
              <span className="grey-3 ph2">No categories</span>
            </div>
          )}

          {/* 文章内容 */}
          <div className="cms mw6">
            {/* 描述 */}
            <p>{description}</p>

            {/* 图片 */}
            {image ? (
              <img src={image} alt={title} />
            ) : (
              <p>No image available.</p>
            )}

            {/* 主要内容 */}
            {widgetFor("body")}
          </div>
        </div>
      </div>
    );
  }
}
