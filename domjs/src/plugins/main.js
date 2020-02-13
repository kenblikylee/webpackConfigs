export default vmap => {
  // fetch('/api/2019-nCov/pub/city-region-cov')
  // fetch('https://cloud.papakaka.com/ncp/api/pub/city-region-cov')
  //   .then(res => res.json())
  //   .then(res => {
  //     vmap.$emit('citypois', res);
  //   });
  // vmap
  //   .locate()
  //   .then(res => {
  //     let {
  //       location_type,
  //       position,
  //       accuracy,
  //       addressComponent: {
  //         country,
  //         province,
  //         city,
  //         district,
  //         township,
  //         street,
  //         streetNumber,
  //         citycode,
  //         adcode
  //       },
  //       formattedAddress,
  //       pois
  //     } = res;
  //     vmap.$emit('locate', {
  //       location_type,
  //       position,
  //       accuracy,
  //       formattedAddress,
  //       pois,
  //       country,
  //       province,
  //       city,
  //       district,
  //       township,
  //       street,
  //       streetNumber,
  //       citycode,
  //       adcode
  //     });
  //   })
  //   .catch(err => {
  //     vmap.$emit('locateFailed', err.message);
  //   });
  vmap.on(
    'click',
    function(e) {
      let { lng, lat } = e.lnglat;
      this.getAddress([lng, lat])
        .then(res => {
          let address = res.regeocode.formattedAddress;
          let {
            country,
            province,
            city,
            district,
            township,
            street,
            streetNumber,
            citycode,
            adcode
          } = res.regeocode.addressComponent;
          this.$emit('click', {
            lng,
            lat,
            address,
            country,
            province,
            city,
            district,
            township,
            street,
            streetNumber,
            citycode,
            adcode
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    vmap
  );
};
