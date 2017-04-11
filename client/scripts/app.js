var Movie = Backbone.Model.extend({

  defaults: {
    like: true
  },

  toggleLike: function() {
    var likeStatus = this.get('like')
    if (likeStatus === true) {
      this.set('like', false)
    }
    else if (likeStatus === false) {
      this.set('like', true)
    }

  }

});

var Movies = Backbone.Collection.extend({

  model: Movie,

  initialize: function() {

  this.on("change:like", function() {
    this.sort()
  },this)
    // your code here

  },


  comparator: 'title',

  sortByField: function(field) {
    // your code here
    this.comparator = field; 
    this.sort()
    
  }

});

var AppView = Backbone.View.extend({

  events: {
    'click form input': 'handleClick'
  },

  handleClick: function(e) {
    var field = $(e.target).val();
    this.collection.sortByField(field);
  },

  render: function() {
    new MoviesView({
      el: this.$('#movies'),
      collection: this.collection
    }).render();
  }

});

var MovieView = Backbone.View.extend({

  template: _.template('<div class="movie"> \
                          <div class="like"> \
                            <button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button> \
                          </div> \
                          <span class="title"><%- title %></span> \
                          <span class="year">(<%- year %>)</span> \
                          <div class="rating">Fan rating: <%- rating %> of 10</div> \
                        </div>'),

  initialize: function() {
 
    this.model.on('change:like', this.render, this);
    // your code here

  },

 

  events: {
    'click button': 'handleClick'
  },

  handleClick: function() {
   
      this.model.toggleLike();
  
    // your code here
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});

var MoviesView = Backbone.View.extend({

  initialize: function() {
    // your code here
    this.collection.on('all', this.render, this);
  },

  render: function() {
    this.$el.empty();
    this.collection.forEach(this.renderMovie, this);
  },

  renderMovie: function(movie) {
    var movieView = new MovieView({model: movie});
    this.$el.append(movieView.render());
  }

});
