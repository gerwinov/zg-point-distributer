import React from 'react';
import styles from './App.module.scss';
import packages from '../../globals/packages';
import Card from '../card/Card';
import Distributer from '../distributer/Distributer';
import Header from '../header/Header';
import Toast from '../toast/Toast';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setActiveCard = this.setActiveCard.bind(this);
    this.determinePackage = this.determinePackage.bind(this);
    this.clearToast = this.clearToast.bind(this);
    this.packageCheck = this.packageCheck.bind(this)
    this.state = {
      activeCard: 0,
      pointsDistributed: 0,
      toastMessages: []
    };
  }

  setActiveCard(name) {
    this.removeAllToasts();

    const packageId = packages.findIndex((pack) => pack.name === name);
    if (packages[packageId]) {
      if (packages[packageId].points < this.state.pointsDistributed) {
        this.setState(state => {
          const message = `Je kunt niet kiezen voor "${packages[packageId].name}" omdat je daarvoor teveel punten hebt verdeeld.`;
          if (state.toastMessages.includes(message)) {
            return
          }
          state.toastMessages.push(message);
          this.forceUpdate(); //Needed because render function doesn't pick up array change. Should refactor later!
        });
        return
      }
      this.setState({
        activeCard: packageId,
      });
    }
  }

  determinePackage(points) {
    this.setState({
      pointsDistributed: points
    });

    this.packageCheck(packages[this.state.activeCard].points, points);
  }

  packageCheck(packagePoints, distributedPoints) {
    this.removeAllToasts();

    const requiredPackage = packages.find((pack) => pack.points >= distributedPoints)
    if (packagePoints < distributedPoints) {
      this.setActiveCard(requiredPackage.name);
      this.setState(state => {
        const message = `We hebben je pakket aangepast naar "${requiredPackage.name}" zodat je genoeg punten hebt om te verdelen.`;
        if (state.toastMessages.includes(message)) {
          return
        }
        state.toastMessages.push(message);
      });
      return
    }

    if (requiredPackage.points !== packagePoints && distributedPoints > 0) {
      this.setState(state => {
        const message = `Op basis van het aantal verdeelde punten zou je ook kunnen kijken naar ons "${requiredPackage.name}" pakket.`;
        if (state.toastMessages.includes(message)) {
          return
        }
        state.toastMessages.push(message);
      });
    }
  }

  clearToast(message) {
    const messages = this.state.toastMessages.filter((el) => el !== message);
    this.setState({
      toastMessages: messages
    });
  }

  removeAllToasts(){
    this.setState({
      toastMessages: []
    });
  }

  render() {
    const cards = packages.map((pack, index) =>
      <Card
        package={pack}
        key={`card-${index}`}
        active={this.state.activeCard === index}
        onCardClick={this.setActiveCard} />
    );
    const toasts = this.state.toastMessages.map((message, index) =>
      <Toast key={`toast-${index}${Date.now()}`} message={message} onClose={this.clearToast} />
    );
    return (
      <div>
        <Header />
        <div className={styles.app}>
          <div className={styles.packages}>
            { cards }
          </div>
          <Distributer
            points={packages[this.state.activeCard].points}
            packageName={packages[this.state.activeCard].name}
            pointsDistributed={this.state.pointsDistributed}
            onPointsUpdate={this.determinePackage} />
          <div className={styles.toastcontainer}>{ toasts }</div>
        </div>
      </div>
    );
  }
}

export default App;
