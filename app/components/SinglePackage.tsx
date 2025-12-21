import styles from "./SinglePckage.module.css";

export default function SinglePackage() {
  return (
    <div className={styles["package-card"]}>
      <div className={`${styles.ribbon} z-99999`}>Most Popular</div>
      <div className={styles["img-box"]}>
        <img src="/cro.jpg" alt="Volcano Tour" />
      </div>
      <div className={styles["package-content"]}>
        <h3>
          <i className="fas fa-volcano"></i> Volcano & Gorilla Trekking
        </h3>
        <p>
          Experience the breathtaking Volcanoes National Park and meet the
          mountain gorillas.
        </p>
        <span className={styles.price}>
          <i className="fas fa-tag"></i> From $650
        </span>
        <a href="/packages/details/[id]" className={styles.btn}>
          <i className="fas fa-eye"></i> View Details
        </a>
      </div>
    </div>
  );
}
