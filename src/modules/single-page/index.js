import {
  Navigate,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import styles from "./SPStyle.module.css";

const SinglePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const params = useParams();

  if (state.id != params.id) return <Navigate to="/" />;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <div className={styles.container}>
        <img src={state.image_url} />
        <div className={styles.info}>
          <div className={styles.block_info}>
            <div>Name:</div>
            <div>{state.name}</div>
          </div>
          <div className={styles.block_info}>
            <div>Description:</div>
            <div className={styles.description}>{state.description}</div>
          </div>
          <div className={styles.block_info}>
            <div>Tagline:</div>
            <div className={styles.tagline}>{state.tagline}</div>
          </div>
          <div className={styles.block_info}>
            <div>First brewed:</div>
            <div>{state.first_brewed}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
