import React from "react";
import styles from "./OrgNews.module.scss";

const OrgNews = () => {
  return (
    <div className={`${styles.newsContainer}`}>
      <div className={`d-flex align-items-center justify-content-center ${styles.newsHeader}`}>News</div>
      <div className={`${styles.overflowScroll}`}>
      <div className={`d-flex justify-content-center ${styles.newsBox}`}>
        <div className={`${styles.newsBoximg}`}>
          <img className={`${styles.newswfull}`} src="https://www.bharatpetroleum.com/images/bpcl_logo_1.jpg" alt="BPCL" />
        </div>
        <div className={`${styles.newsBoxcontent}`}>
          <h4>Bharat Petroeum collaborates with Cube Highways to Provide a value added services at selected Ghar Oulets</h4>
          <p><span role="img" aria-labelledby="jsx-ally/accessible/emoji">&#x1f4c5;</span> 12 November, 2020</p>
        </div>
      </div>
      <div className={`d-flex justify-content-center ${styles.newsBox}`}>
        <div className={`${styles.newsBoximg}`}>
          <img className={`${styles.newswfull}`} src="https://www.bharatpetroleum.com/images/bpcl_logo_1.jpg" alt="BPCL" />
        </div>
        <div className={`${styles.newsBoxcontent}`}>
          <h4>Bharat Petroeum collaborates with Cube Highways to Provide a value added services at selected Ghar Oulets</h4>
          <p><span role="img" aria-labelledby="jsx-ally/accessible/emoji">&#x1f4c5;</span> 12 November, 2020</p>
        </div>
      </div>
      <div className={`d-flex justify-content-center ${styles.newsBox}`}>
        <div className={`${styles.newsBoximg}`}>
          <img className={`${styles.newswfull}`} src="https://www.bharatpetroleum.com/images/bpcl_logo_1.jpg" alt="BPCL" />
        </div>
        <div className={`${styles.newsBoxcontent}`}>
          <h4>Bharat Petroeum collaborates with Cube Highways to Provide a value added services at selected Ghar Oulets</h4>
          <p><span role="img" aria-labelledby="jsx-ally/accessible/emoji">&#x1f4c5;</span> 12 November, 2020</p>
        </div>
      </div>
      <div className={`d-flex justify-content-center ${styles.newsBox}`}>
        <div className={`${styles.newsBoximg}`}>
          <img className={`${styles.newswfull}`} src="https://www.bharatpetroleum.com/images/bpcl_logo_1.jpg" alt="BPCL" />
        </div>
        <div className={`${styles.newsBoxcontent}`}>
          <h4>Bharat Petroeum collaborates with Cube Highways to Provide a value added services at selected Ghar Oulets</h4>
          <p><span role="img" aria-labelledby="jsx-ally/accessible/emoji">&#x1f4c5;</span> 12 November, 2020</p>
        </div>
      </div>
      </div>
    </div>
  )
}
export default OrgNews;