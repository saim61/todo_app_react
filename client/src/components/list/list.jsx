import Card from "../listcard";
import "./list.styles.css";
import Image from "../../images/todo.png";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTasks } from "../../redux/taskSlice";
const List = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.Auth);
  const { task } = useSelector((state) => state.Task);
  useEffect(() => {
    dispatch(getTasks(user.id));
  }, [dispatch, user]);
  return (
    <div className="list-main-container">
      {task.length > 0 ? (
        task.map((data) => <Card key={data.taskId} {...data} />)
      ) : (
        <div
          style={{
            display: "flex",
            flex: "1",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={Image} alt="img" style={{ width: "30%", height: "30%" }} />
        </div>
      )}
    </div>
  );
};

export default List;
