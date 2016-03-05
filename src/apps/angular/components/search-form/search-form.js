app.directive('searchForm', [function() {
  return {
    templateUrl: 'dist/views/search-form/search-form.html',
    controller: _SearchFormController,
    controllerAs: 'Search',
    bindToController: true
  };

  /* @ngInject */
  function _SearchFormController(Api, ApiKeys, Endpoint) {

    var Search = this;
    Search.Value = "";

    Search.Perform = function() {
      console.log(Search.Value);
      Api.request(Endpoint.article_search + '?q=' + Search.Value + '&=' + ApiKeys.article).then(function(res) {
        console.log(res);
      }).catch(function(err) {
        console.log(err);
      });
    };
  };
}]);
