setTimeout(() => {
  console.log('2s passed');
  setTimeout(() => {
    console.log('3s passed');
    setTimeout(() => {
      console.log('6s passed');

      setTimeout(() => {
        console.log('2s passed');
        setTimeout(() => {
          console.log('3s passed');
          setTimeout(() => {
            console.log('6s passed');

            setTimeout(() => {
              console.log('2s passed');
              setTimeout(() => {
                console.log('3s passed');
                setTimeout(() => {
                  console.log('6s passed');
                }, 3000);
              }, 1000);
            }, 2000);
          }, 3000);
        }, 1000);
      }, 2000);
    }, 3000);
  }, 1000);
}, 2000);
