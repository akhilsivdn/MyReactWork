import React from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Modal, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import StarRatings from 'react-star-ratings';
// import Pagination from "material-ui-flat-pagination";
// import { PaginationComponent } from "./PaginationComponent"
import Pagination from "react-js-pagination";

export class HomeComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            hits: [],
            isLoading: true,
            totalPageCount: 0,
            currentPage: 1,
            totalHits: 0,
            offset: 0,
            hitCount: 0,
            activePage: 15
        }
    }

    handleClick(offset) {
        this.setState({
            currentPage: offset + 1
        });
        debugger
        // if (offset == 0) {
        //     this.setState({
        //         isLoading: true
        //     });
        // }
        // else {
        //     offset = offset + 1;// (offset / 5) + 1;
        //     this.setState({
        //         isLoading: true
        //     });
        // }
        this.GetItems(offset);
    }

    componentDidMount() {
        this.GetItems(0);
    }

    GetItems(offset) {
        debugger
        var url = 'https://blaze.ratecity.com.au/api/search/home-loans';
        if (offset > 1) {
            url = 'https://blaze.ratecity.com.au/api/search/home-loans?page=' + offset;
        }

        fetch(url)
            .then(res => res.json())
            .then(data => this.setState({
                hits: data.hits,
                isLoading: false,
                totalPageCount: data.meta.page_count,
                currentPage: data.meta.page,
                totalHits: data.meta.total_count,
                hitCount: data.meta.hit_count
            }
            ));
    }


    render() {
        if (this.state.isLoading) {
            return (
                <div className="loadingBar">
                    <Modal
                        open={this.state.isLoading}
                        style={{
                            transitionDuration: '800ms',
                            transitionDelay: '800ms'
                        }}>
                        <CircularProgress
                            style={{
                                position: 'absolute',
                                top: '45%',
                                left: '47%',
                                color: '#1f41fa',
                            }}
                            thickness={4}
                            size={70}
                        />
                    </Modal>
                </div>
            )
        }

        return (
            <div>
                {/* <Pagination
                    limit={10}
                    offset={this.state.offset}
                    total={100}
                    onClick={(e, offset) => this.handleClick(offset)}
                /> */}

         <Pagination
          activePage={0}
          itemsCountPerPage={this.state.hitCount}
          totalItemsCount={this.state.totalHits}
          pageRangeDisplayed={this.state.totalPageCount}
          onChange={(activePage) => this.handleClick(activePage)}
        /> 


                <div className="grid">
                    {
                        this.state.hits.map(function (hit, i) {
                            return (
                                <div className="hitsGrid">
                                    <Card
                                        style={{
                                            height: '300px',
                                            width: '250px',
                                            padding: 'inherit',
                                            marginInlineEnd: '10px',
                                            marginTop: '5px',
                                            marginBottom: '10px',
                                            borderRadius: '10px',
                                            position: 'relative'
                                        }} >
                                        <CardActionArea
                                            style={{
                                                width: 'auto'
                                            }}>
                                            <CardMedia
                                                component="img"
                                                src={hit.company.logo}
                                                style={{
                                                    objectFit: 'scale-down'
                                                }}
                                            />
                                            <CardContent style={{
                                                padding: '5px'
                                            }}>
                                                <Typography variant="subheading" className="name">
                                                    {hit.name}
                                                </Typography>
                                            </CardContent>
                                            <CardContent style={{
                                                padding: '5px'
                                            }}>
                                                <Typography>
                                                    <StarRatings starDimension="20px"
                                                        starSpacing="2px"
                                                        rating={hit.productRating}
                                                        starRatedColor="blue"
                                                        numberOfStars={5} />
                                                    <span className="details">Advertised Rate : {hit.advertisedRate}</span>
                                                    <span className="details">Comparison Rate : {hit.comparisonRate}</span>
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions className="card-footer btn">
                                            <Button className="btnText" color="primary">
                                                <a href={hit.gotoSiteUrl} target="_blank">Know More</a>
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        )
    }
}