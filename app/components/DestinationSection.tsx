"use client";

import { useEffect } from "react";
import styles from "./DestinationSection.module.css";
import Image from "next/image";
import Link from "next/link";
export default function DestinationSection() {
  return (
    <section className={`h-[1050px] sm:h-fit  ${styles.destins}`} id="destins">
      <div className={styles["destins-container"]}>
        <Link
          href="/packages?filter=rwanda"
          className={`${styles["destination-card"]}  h-[300px]! sm:h-full!`}
        >
          <Image width={500} height={500} src="/cro.webp" alt="Rwanda" />
          <div className={styles["glass-overlay"]}>
            <h3>Rwanda</h3>
          </div>
        </Link>

        <Link
          href="/packages?filter=uganda"
          className={`${styles["destination-card"]} h-[300px]! sm:h-full!`}
        >
          <Image width={500} height={500} src="/gorila.webp" alt="Uganda" />
          <div className={styles["glass-overlay"]}>
            <h3>Uganda</h3>
          </div>
        </Link>

        <Link
          href="/packages?filter=tanzania"
          className={`${styles["destination-card"]} h-[300px]! sm:h-full!`}
        >
          <Image width={500} height={500} src="/mountain.webp" alt="Tanzania" />
          <div className={styles["glass-overlay"]}>
            <h3>Tanzania</h3>
          </div>
        </Link>

        <Link
          href="/packages?filter=kenya"
          className={`${styles["destination-card"]} h-[300px]! sm:h-full!`}
        >
          <Image width={500} height={500} src="/lion.webp" alt="Kenya" />
          <div className={styles["glass-overlay"]}>
            <h3>Kenya</h3>
          </div>
        </Link>
      </div>
    </section>
  );
}
