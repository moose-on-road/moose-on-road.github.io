
    // Banner setup
    const bannerText = 'Sorry about the mess, our website is still under construction';
    const topBanner = document.createElement('div');

    topBanner.id = 'bannerTop';
    topBanner.insertAdjacentHTML("afterbegin", `<p>${bannerText}</p>`);

    setTimeout(() => {
        requestAnimationFrame(() => {
            document.body.append(topBanner);
        })

        setTimeout(() => {
            requestAnimationFrame(() => {
                topBanner.classList.add('visible');
            })
        }, 50);

        setTimeout(() => {
            requestAnimationFrame(() => {
                topBanner.classList.remove('visible');
            }) 
        }, 8000);
    }, 1500);

