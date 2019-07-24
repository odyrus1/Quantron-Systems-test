// Import
import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';

// Local Import
import StackPost from './StackPost';
import './style.css'

class Stackoverflow extends Component{

  // loading: показывать preloader или нет; data: посты; orderAsc: порядок сортировки Постов; buttonAsc: направление сортировки для кнопки
  state = {
    loading: true,
    data: '',
    orderAsc: false,
    buttonAsc: true
  }

  componentDidMount() {
    axios.get('https://api.stackexchange.com/2.2/search?intitle=react&site=stackoverflow')
    .then(response => {
      // Оставляем только посты с ответом и с репутацией овнера не менее 50
      let filteredPosts = _.remove(response.data.items, function(item) {
                            return item.is_answered === true && item.owner.reputation >= 50
                          });
      // Сортируем посты по дате создания. Сначала самые новые
      let filteredOrdered = _.orderBy(filteredPosts, ['creation_date'], ['asc']);
      // Пушим отфильтрованные посты в стейт. Убираем preloader
      this.setState({
        loading: false,
        data: filteredOrdered,
      })
    })
    .catch(error => {
      console.log(error);
    });
  };

  changeFilter = () => {
    let Posts = this.state.data;
    // Узнаем предыдущий порядок сортировки постов
    let order = this.state.orderAsc ? 'asc' : 'desc';
    // Меняем порядок сортировки постов
    let OrderedPosts = _.orderBy(Posts, ['creation_date'], [order]);
    // Пушим посты в новом порядке. Меняем порядок в стейте на противоположный для следующего раза.
    this.setState({
      ...this.state,
      data: OrderedPosts,
      orderAsc: !this.state.orderAsc,
      buttonAsc: !this.state.buttonAsc
    })
  };

  render(){
    return (
      <div className="stackPosts-container">
      <button className="orderButton" onClick={this.changeFilter}>Показать {this.state.buttonAsc ? 'старые' : 'новые'} посты</button>
        {
          this.state.loading
          ?
            <div className="preloader">Loading...</div>
          :
            this.state.data.map((post, index) => (
              <StackPost key={index} postData={post} />
            ))
        }
      </div>
    );
  }
}

export default Stackoverflow;
