"use client";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathname.split("/").pop()}</div>
      {/* <div className={styles.menu}>
        <div className={styles.search}>
          <SearchIcon />
          <input type="text" placeholder="Search..." className={styles.input} />
        </div>
        <div className={styles.icons}>
          <ChatBubbleOutlineIcon size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div>
      </div> */}
    </div>
  );
};

export default Navbar;