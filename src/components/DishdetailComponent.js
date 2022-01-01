import * as React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Label,
} from "reactstrap";
import { Control, Errors, LocalForm } from "react-redux-form";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

import { Loading } from "./LoadingComponent";
import { required, maxLength, minLength } from "../shared/validators";
import { baseUrl } from "../shared/baseUrl";

//Just putting on CamelCase.
Control.Text = Control.text;
Control.Checkbox = Control.checkbox;
Control.TextArea = Control.textarea;
Control.Select = Control.select;

const RenderDish = ({ dish }) =>
  dish != null ? (
    <FadeTransform
      in
      transformProps={{
        exitTransform: "scale(0.5) translateY(-50%)",
      }}
    >
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </FadeTransform>
  ) : (
    <div></div>
  );

const RenderComments = ({ comments, postComment, dishId }) =>
  comments != null ? (
    <>
      <h4>Comments</h4>
      <ul className="list-unstyled">
        <Stagger in>
          {comments.map((comment) => {
            return (
              <Fade in>
                <li>{comment.comment}</li>
                <li>
                  --{comment.author},{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(Date.parse(comment.date)))}
                </li>
              </Fade>
            );
          })}
        </Stagger>
      </ul>
      <CommentForm dishId={dishId} postComment={postComment} />
    </>
  ) : (
    <div></div>
  );

const CommentForm = ({ postComment, dishId }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen((previous) => !previous);
  const handleSubmit = (values) =>
    postComment(dishId, values.rating, values.author, values.comment);

  return (
    <div>
      <Button onClick={toggle} outline>
        <FaPencilAlt /> Submit Comment
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Submit Comment</ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={handleSubmit}>
            <Row className="form-group">
              <Label className="form-label" htmlFor="rating">
                Rating
              </Label>
              <Control.Select
                model=".rating"
                id="rating"
                name="rating"
                className="form-control"
                defaultValue={5}
              >
                {[0, 1, 2, 3, 4, 5].map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </Control.Select>
            </Row>

            <Row className="form-group">
              <Label className="form-label" htmlFor="author">
                Your Name
              </Label>
              <Control.Text
                model=".author"
                id="author"
                name="author"
                className="form-control"
                placeholder="Your Name"
                validators={{
                  required,
                  minLength: minLength(3),
                  maxLength: maxLength(15),
                }}
              />
              <Errors
                className="text-danger"
                model=".author"
                show={{ touched: true }}
                component="div"
                messages={{
                  required: "Required",
                  minLength: "Must be greater than 2 characters",
                  maxLength: "Must be 15 characters or less",
                }}
              />
            </Row>

            <Row className="form-group">
              <Label className="form-label" htmlFor="comment">
                Comment
              </Label>
              <Control.TextArea
                model=".comment"
                id="comment"
                name="comment"
                rows="6"
                className="form-control"
                validators={{ required }}
              />
              <Errors
                className="text-danger"
                model=".comment"
                show={{ touched: true }}
                component="div"
                messages={{
                  required: "Required",
                }}
              />
            </Row>

            <Button type="submit" color="primary">
              Submit
            </Button>
          </LocalForm>
        </ModalBody>
      </Modal>
    </div>
  );
};

export const DishdetailComponent = (props) =>
  props.isLoading ? (
    <div className="container">
      <div className="row">
        <Loading />
      </div>
    </div>
  ) : props.errMess ? (
    <div className="container">
      <div className="row">
        <h4>{props.errMess}</h4>
      </div>
    </div>
  ) : props.dish != null ? (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments
            comments={props.comments}
            postComment={props.postComment}
            dishId={props.dish.id}
          />
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
