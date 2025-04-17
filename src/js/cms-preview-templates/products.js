import React from "react";
import Jumbotron from "./components/jumbotron";

export default class ProductsPreview extends React.Component {
  render() {
    const {entry, getAsset} = this.props;
    const image = getAsset(entry.getIn(["data", "image"]));

    return (
      <div>
        <Jumbotron image={image} title={entry.getIn(["data", "title"])} />

        <div className="mw7 center">
          <div className="mw6 ph3 mb3">
            <h3 className="f3 b lh-title mb2">{entry.getIn(["data", "content"])}</h3>
          </div>

          <ul className="flex-ns flex-wrap mhn1-ns pa3">
            {(entry.getIn(["data", "products"]) || []).map((product, index) => (
              <div className="w-100-ns ph1-ns flex mb4" key={index}>
                <a href={product.get("link")} className="no-underline pa3 bg-grey-1 br1 mb2 db raise w-100">
                  <div className="flex flex-column flex-row-ns">
                    {product.get("image") && (
                      <div className="pr3-ns mb3 mb0-ns w-40-ns">
                        <img src={getAsset(product.get("image"))} alt={product.get("title")} className="db" style={{width: "100%", height: "auto"}} />
                      </div>
                    )}
                    <div className="w-60-ns">
                      <h2 className="f3 b lh-title mb1 primary">{product.get("title")}</h2>
                      <p className="mid-gray lh-title mb2">{product.get("date")}</p>
                      <p className="mb0">{product.get("description")}</p>
                      <p className="link b dib black mb0">阅读更多 →</p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
