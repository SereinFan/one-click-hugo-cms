import CMS from "decap-cms-app";

// Import main site styles as a string to inject into the CMS preview pane
// eslint-disable-next-line import/no-unresolved
import styles from "!to-string-loader!css-loader!postcss-loader!sass-loader!../css/main.scss";

import HomePreview from "./cms-preview-templates/home";
import PostPreview from "./cms-preview-templates/post";
import ProductsPreview from "./cms-preview-templates/products";
import ValuesPreview from "./cms-preview-templates/values";
import ContactPreview from "./cms-preview-templates/contact";
import FooterPreview from "./cms-preview-templates/footer";

// 动态加载分类数据
fetch("/categories.json")
  .then((response) => response.json())
  .then((categories) => {
    // 注册分类字段
    CMS.registerWidget("categories", "select", {
      options: categories.map((category) => ({
        label: category,
        value: category,
      })),
    });

    // 初始化 CMS
    CMS.registerPreviewStyle(styles, { raw: true });
    CMS.registerPreviewTemplate("home", HomePreview);
    CMS.registerPreviewTemplate("post", PostPreview);
    CMS.registerPreviewTemplate("products", ProductsPreview);
    CMS.registerPreviewTemplate("values", ValuesPreview);
    CMS.registerPreviewTemplate("contact", ContactPreview);
    CMS.registerPreviewTemplate("footer", FooterPreview);
    CMS.init();
  })
  .catch((error) => console.error("Error loading categories:", error));
