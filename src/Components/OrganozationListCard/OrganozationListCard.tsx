import { Copy } from "lucide-react";
import { useToast } from "../../Context/ToastContext";
import { useClipboard } from "../../Hooks/useClipboard";
import Button from "../Button/Button";
import styles from "./OrganozationListCard.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  image: string;
  key?: string;
  id?: string;
}

const OrganozationListCard: React.FC<Props> = ({
  name,
  image,
  key,
  id = "do-team",
  ...props
}) => {
  // Custom Hooks
  const { copy } = useClipboard();
  const { showToast } = useToast();

  return (
    <div key={key} className={styles.card} {...props}>
      <img src={image} alt={name} className={styles.avatar} />
      <div>
        <span className={styles.name}>{name}</span>
        <span className={styles.id}>
          Organization slug: {id}
          <Button
            className={styles.copyButton}
            type="tertiary"
            onClick={(e) => {
              e.preventDefault();
              copy(id);
            }}
          >
            <Copy size={10} color="#a1a1a1" />
          </Button>
        </span>
      </div>
      <Button type="secondary" className={styles.joinbutton}>
        Request to join
      </Button>
    </div>
  );
};

export default OrganozationListCard;
