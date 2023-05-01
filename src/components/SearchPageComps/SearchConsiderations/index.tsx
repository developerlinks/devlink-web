import StrIcon from "@/materials/StrIcon";
import styles from "./index.module.scss";
import { IconBulb } from "@douyinfe/semi-icons";

export function SearchConsiderations() {
  return (
    <div className={styles.tipsContainer}>
      <div className={styles.tipsBold}><IconBulb />专业提示</div>
      <div>
        按下 <StrIcon> / </StrIcon> 键重新激活搜索输入框并调整您的查询
      </div>
    </div>
  );
}
