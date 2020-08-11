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
    this.addToast = this.addToast.bind(this);
    this.state = {
      activeCard: 0,
      pointsDistributed: 0,
      toastMessages: [],
      showLowerPackageToast: true
    };
  }

  setActiveCard(name) {
    this.removeAllToasts();

    const packageId = packages.findIndex((pack) => pack.name === name);
    if (packages[packageId]) {
      if (packages[packageId].points < this.state.pointsDistributed) {
        this.addToast(`Je kunt niet kiezen voor "${packages[packageId].name}" omdat je daarvoor teveel punten hebt verdeeld.`);
        return;
      }
      this.setState({
        activeCard: packageId,
        showLowerPackageToast: true
      });
    }
  }

  determinePackage(points) {
    this.setState({
      pointsDistributed: points
    });

    const requiredPackage = packages.find((pack) => pack.points >= points)
    if (packages[this.state.activeCard].points < points) {
      this.setActiveCard(requiredPackage.name);
      this.addToast(`We hebben je pakket aangepast naar "${requiredPackage.name}" zodat je genoeg punten hebt om te verdelen.`);
      return;
    }

    if (requiredPackage.points !== packages[this.state.activeCard].points && points > 0 && this.state.showLowerPackageToast) {
      this.addToast(`Op basis van het aantal verdeelde punten zou je ook kunnen kijken naar ons "${requiredPackage.name}" pakket.`);
      this.setState({
        showLowerPackageToast: false
      });
    }
  }

  addToast(message) {
    this.setState(state => {
      if (state.toastMessages.includes(message)) {
        return
      }
      state.toastMessages.push(message);
    });
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
      <Toast key={`toast-${message}`} message={message} onClose={this.clearToast} />
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
