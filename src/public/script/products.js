document.addEventListener("DOMContentLoaded", function() {
    const imagenes = document.querySelectorAll(".plasticos_imagen");
    imagenes.forEach((imagen, index) => {
        let intervalId;
        imagen.addEventListener("mouseover", function() {
            let counter = 1;
            intervalId = setInterval(() => {
                const nextImage = imagen.dataset[`img${counter}`];
                if (nextImage) {
                    imagen.src = nextImage;
                    counter++;
                    if (counter > 4) {
                        counter = 1;
                    }
                }
            }, 600); 
        });

        imagen.addEventListener("mouseout", function() {
            clearInterval(intervalId);
            imagen.src = imagen.dataset.img1;
        });
    });
});


