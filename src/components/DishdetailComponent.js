import { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export class DishdetailComponent extends Component {
  renderDish(dish) {
    if (dish != null)
      return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    else return <div></div>;
  }

  renderComments(comments) {
    if (comments != null)
      return (
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
      );
    else return <div></div>;
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {this.renderDish(this.props.dish)}
        </div>
        <div className="col-12 col-md-5 m-1">
          {this.props.dish && this.renderComments(this.props.dish.comments)}
        </div>
      </div>
    );
  }
}
