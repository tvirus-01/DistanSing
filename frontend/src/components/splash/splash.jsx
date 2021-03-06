import React from 'react';
import Carousel from './carousel.jsx';
import ArtistFeature from './artist_feature.jsx';
import Flickity from 'flickity';
import FeaturedStream from './featured_stream';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.linkToArtistShow = this.linkToArtistShow.bind(this);
    this.linkToEventShow = this.linkToEventShow.bind(this);
    this.artistTries = 0;
    this.eventTries = 0;
  }

  componentDidMount() {
    this.props.fetchArtists()
      // .then(() => this.props.fetchEvents())

    if (this.soons) {
      let soony = document.getElementById('soon-carousel')

      if (soony) {
        new Flickity(soony, {
          draggable: false,
          wrapAround: true,
          groupCells: 3
        })
      };
    }
  }

  // componentDidUpdate(prevProps) {
  //   if (Object.values(this.props.artists) < 8) this.props.fetchArtists()
  //   if (Object.values(this.props.events) < 8) this.props.fetchEvents()
  // }

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // getLiveStreams() {
  //   if (Object.values(this.props.events).length < 6) {
  //     this.props.fetchEvents()
  //     return null;
  //   }
  //   let now = (new Date()).getTime()

  //   let liveStreams = this.props.events.filter(event => {
  //     const date = (new Date(event.date)).getTime();
  //     // return (date < now && date > (now-3600000))
  //     return (date > now)
  //   })

  //   let shuffled = this.shuffle(liveStreams)

  //   return shuffled[0] ? <Carousel streams={shuffled} type="live" linkToEventShow={this.linkToEventShow} /> : null
  // }

  getUpcomingStreams() {
    let now = (new Date()).getTime()
    
    let soonStreams = this.props.events.filter(event => {
      const date = (new Date(event.date)).getTime();
      // return (date > now && date < (now + 86400000))
      return (date > now)
    })
    if ((soonStreams).length < 4) {
      if (this.eventTries < 2) {
        this.props.fetchEvents()
        this.eventTries++;
      }
      return null;
    }

    // let shuffled = this.shuffle(soonStreams).slice(0,18)
    let upcoming = Object.values(soonStreams).sort()
    // console.log(shuffled)
    return <Carousel streams={upcoming} type="soon" linkToEventShow={this.linkToEventShow} />;
  }

  getTrendingArtists() {
    if (Object.keys(this.props.artists).length < 6) {
      if (this.ArtistTries < 2) {
        this.props.fetchArtists()
        this.ArtistTries++;
      }
      return null;
    }
    let splashArtistsIds = 
      ["5ed72c0810435f4933a2a981", 
        "5ed7247de51f52f959016c5e", 
        "5edcddc8e983d90017165915", 
        "5ed743f92449e20ea0502176", 
        "5ed7446ed226eb0efe0eb32d", 
        "5ee61848a600800017efa967", 
        "5ed7479065cc90109a241221", 
        "5ed7436eb759170e19d357ba"];
    let trending = [];
    
    for (let i = 0; i < splashArtistsIds.length; i++) {
      trending.push(this.props.trendingArtists[splashArtistsIds[i]])
    }
    // let shuffled = this.shuffle(this.props.artists).slice(0,8)

    return trending[0] ? <ArtistFeature artists={trending} linkToArtistShow={this.linkToArtistShow} /> : null
  }

  linkToArtistShow(artist) {
    this.props.fetchArtist(artist._id)
      .then(() => this.props.history.push(`/artists/${artist._id}`))
  }

  linkToEventShow(event) {
    this.props.history.push(`/events/${event._id}`)
  }

  render() {
    // this.lives = this.lives ? this.lives : this.getLiveStreams()
    this.soons = this.soons ? this.soons : this.getUpcomingStreams()
    this.randos = this.randos ? this.randos : this.getTrendingArtists()

    // const LiveNow = this.lives ? (
    //   <div className="stream-carousel-container" id="live-now">
    //     <h3>LIVE</h3>
    //     {this.lives}
    //   </div>
    // ) : null;

    const StreamingSoon = this.soons ? (
      <div className="stream-carousel-container" id="streaming-soon">
        <h3>Streaming Soon!</h3>
        {this.soons}
      </div>
    ) : null;

    const TrendingArtists = this.randos ? (
      <div id="trending-artists">
        <h3>Trending Artists</h3>
        {this.randos}
      </div>
    ): null;

    let soony = document.getElementById('soon-carousel')
    // let livey = document.getElementById('live-carousel')

    if (soony) {
      new Flickity(soony, {
        draggable: false,
        wrapAround: true,
        groupCells: 3
    })};

    // if (livey) {
    //   new Flickity(livey, {
    //     draggable: false,
    //     wrapAround: true,
    //     groupCells: 3
    // })};

    // const Placeholder = (LiveNow || StreamingSoon) ? null : (
    //   <div>Looks like it's pretty quiet around here.<br/><br/> Sign up as an artist and start streaming today!</div>
    // )
    
    return (
      <div className="splash">
        <div
          className="background-splash"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80")`,
          }}
        >
          <div className="background-splash-filter">
            <div className="splash-header">
              {/* <h2 className="site-heading">
                Welcome To DistanSing, where we're all only 6 beats apart
              </h2> */}
            </div>
            <div className="splash-body">
              <div className="event-category-container">
                <FeaturedStream />
                {/* {LiveNow} */}
                {StreamingSoon}
              </div>
              <div className="random-artist-container">{TrendingArtists}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;