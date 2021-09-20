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

import { required, maxLength, minLength } from "../shared/validators";

//Just putting on CamelCase.
Control.Text = Control.text;
Control.Checkbox = Control.checkbox;
Control.TextArea = Control.textarea;
Control.Select = Control.select;

const RenderDish = ({ dish }) =>
  dish != null ? (
    <Card>
      <CardImg top src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  ) : (
    <div></div>
  );

const RenderComments = ({ comments }) =>
  comments != null ? (
    <>
      <h4>Comments</h4>
      <ul className="list-unstyled">
        {comments.map((comment) => {
          return (
            <>
              <li>{comment.comment}</li>
              <li>
                --{comment.author},{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(comment.date)))}
              </li>
            </>
          );
        })}
      </ul>
    </>
  ) : (
    <div></div>
  );

const SubmitComment = ({ comments }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen((previous) => !previous);

  return (
    <div>
      <Button onClick={toggle} outline>
        <FaPencilAlt /> Submit Comment
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Submit Comment</ModalHeader>
        <ModalBody>
          <LocalForm
            onSubmit={(values) => {
              console.log(values);
              alert(JSON.stringify(values));
              toggle();
            }}
          >
            <Row className="form-group">
              <Label className="form-label" htmlFor="rating">
                Comment
              </Label>
              <Control.Select
                model=".rating"
                id="rating"
                name="rating"
                className="form-control"
                defaultValue={10}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </Control.Select>
            </Row>

            <Row className="form-group">
              <Label className="form-label" htmlFor="name">
                Your Name
              </Label>
              <Control.Text
                model=".name"
                id="name"
                name="name"
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
                model=".name"
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
                rows="4"
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

export const DishdetailComponent = (props) => {
  return (
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
          <RenderComments comments={props.comments} />
          <SubmitComment comments={props.comments} />
        </div>
      </div>
    </div>
  );
};
