import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/plugins/counter.css';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Thumbnail from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import Autoplay from 'embla-carousel-autoplay';

const ImageCarousel = (props) => {
    const { images, id } = props;

    const [currentIndex, setCurrentIndex] = React.useState(-1);

    const handleImageClick = (index) => setCurrentIndex(index);
    return (
        <div className="container mx-auto">
            {/* <div className="flex flex-col items-center">
                <div className="relative w-full max-w-3xl mb-4">
                    <img
                        src={images[currentIndex].image_url}
                        alt={`slide ${currentIndex + 1}`}
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                    />

                    <button
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                        onClick={prevImage}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                        onClick={nextImage}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex space-x-2 overflow-y-auto">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image.image_url}
                            alt={`image ${index + 1}`}
                            className={`w-16 h-16 object-cover rounded-lg shadow-md cursor-pointer ${
                                currentIndex === index
                                    ? 'border-2 border-blue-500'
                                    : ''
                            }`}
                            onClick={() => handleImageClick(index)}
                        />
                    ))}
                </div>
            </div> */}

            <div className="w-full flex justify-center mt-10">
                <Carousel
                    opts={{ align: 'center', loop: true }}
                    plugins={[Autoplay({ delay: 3000 })]}
                    className="w-full max-w-sm md:max-w-7xl"
                >
                    <CarouselContent>
                        {images.map((image, index) => (
                            <CarouselItem
                                key={index}
                                className="md:basis-1/2 lg:basis-1/3"
                            >
                                <div className="p-1">
                                    <img
                                        src={image.image_url}
                                        alt={`image ${index + 1}`}
                                        className="aspect-[3/2] object-cover rounded-lg shadow-md"
                                        onClick={() => handleImageClick(index)}
                                    />
                                    <Lightbox
                                        plugins={[
                                            Fullscreen,
                                            Thumbnail,
                                            Zoom,
                                            Counter,
                                        ]}
                                        index={currentIndex}
                                        open={currentIndex === index}
                                        close={() => setCurrentIndex(-1)}
                                        slides={images.map((image) => ({
                                            src: image.image_url,
                                            caption: '',
                                        }))}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselNext className="-right-1 md:-right-10" />
                    <CarouselPrevious className="-left-1 md:-left-10" />
                </Carousel>
            </div>
        </div>
    );
};

export default ImageCarousel;
