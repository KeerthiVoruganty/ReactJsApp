import React, { Component } from 'react';
import './Home.css';
import './HomeCarousel.css'
import '../PublicPage/Rating/badge.css'
import Slider from "react-slick";
import Badge from "../PublicPage/Rating/badge"
import { getBadges } from '../../Helper'

export default class HomeCarousel extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.keep = this.keep.bind(this);
    }
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }
    keep() {

    }

    get screenWidth(){
        return  window.screen.width;
    }

    render() {
        let slidesToShow = 5;
        if (this.screenWidth <= 600 ){
            slidesToShow = 3;   
        }
        const settings = {
            dots: false,
            infinite: false,
            slidesToShow: slidesToShow,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 2000,
            pauseOnHover: true,
            arrows: true,
            
        };

        const feedbacks = this.props.feedbacks;

        const badges_data = getBadges();

        function getCount(title) {
            const count = feedbacks.filter(feedback => feedback.badge_title === title).length;
            return count;
        }

        const uniqueObjects = [...new Map(feedbacks.map(item => [item.badge_title, item])).values()];

        function getBadgeData(title) {
            title=title.toLowerCase().split(' ').join('');
            let icon_path = '';
            let titleDisplay = ''
            for (let i=0; i<badges_data.length;i++){
                let badgesTitle = badges_data[i].badge_title.toLowerCase().split(' ').join('');
                if (title==badgesTitle){
                    icon_path = badges_data[i].icon_path;
                    titleDisplay =  badges_data[i].badge_title
                }
            };
            return {icon_path,titleDisplay};  
        };


        return (
            <div className='home-carousel-badge'>
                <div className=''>
                    <Slider ref={c => (this.slider = c)}  {...settings}>

                        {uniqueObjects.map(feedback => {
                            return <div className='badge-home-carousel'>
                                <Badge title={getBadgeData(feedback.badge_title).titleDisplay} iconURL={getBadgeData(feedback.badge_title).icon_path} number={getCount(feedback.badge_title)} activeClass={false} />
                            </div>
                        })
                        }

                    </Slider>
                </div>

                

            </div>

        );
    }
}
