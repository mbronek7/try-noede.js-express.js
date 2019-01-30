var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping', {useNewUrlParser: true});

var products = [
  new Product({
    imagePath: 'http://bi.gazeta.pl/im/ae/62/c4/z12870318Q.jpg?preview=1',
    title: 'Krowa',
    description: 'Polska łaciata krowa. Krowa jest zdrowa i dojna',
    price: 5000
  }),
  new Product({
    imagePath: 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.yKdwVGRZ2W8VLhDhD00KTAHaE9%26pid%3D15.1&f=1',
    title: 'Owca',
    description: 'Polska młoda owca zwyczajna',
    price: 1500
  }),
  new Product({
    imagePath: 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fd-nm.ppstatic.pl%2Fk%2Fr%2F36%2Fe1%2F59f07798b49b9_o.jpg%3F1508931496&f=1',
    title: 'Kogut',
    description: 'Młody kogut w sile wieku',
    price: 310
  }),
  new Product({
    imagePath: 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fdinoanimals.pl%2Fwp-content%2Fuploads%2F2015%2F06%2FDziki_indyk_12.jpg&f=1',
    title: 'Indyk',
    description: 'Indyk w sam raz na obiad',
    price: 180
  }),
  new Product({
    imagePath: 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.tapeciarnia.pl%2Ftapety%2Fnormalne%2F257206_osiol.jpg&f=1',
    title: 'Osioł',
    description: 'Osioł przyzwyczajony do ciężkiej pracy na wsi',
    price: 2300
  }),
  new Product({
    imagePath: 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rynek-rolny.pl%2Fimages%2Farticles%2F560%2F13eb736dbb69f54ae50802df89a04256-kon-fiordzki-1-male.jpg&f=1',
    title: 'Koń Fiordzki',
    description: 'Koń Fiordzki idealny na średnie gospodarstwo',
    price: 7400
  }),
  new Product({
    imagePath: 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.audubon.org%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fwysiwyg_slide%2Fpublic%2Fsfw_bradleylewis_281252-domestic-goose-kk.jpg%3Fitok%3DWh0Q0GOO&f=1',
    title: 'Gęś domowa',
    description: 'Polska Gęś i do obiadu i do pierza',
    price: 230
  }),
  new Product({
    imagePath: 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fgolebie.org.pl%2Fwp-content%2Fuploads%2F2012%2F04%2FPlcioznaczny-golab-teksaski.jpg&f=1',
    title: 'Gołąb domowy',
    description: 'Gołąb z Polskiej rodzinnej hodowli z wartościami',
    price: 180
  }),
  new Product({
    imagePath: 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.boredpanda.com%2Fblog%2Fwp-content%2Fuploads%2F2017%2F10%2Fninja-cats-photography-hisakata-hiroyuki-10-59f197289e003__880.jpg&f=1',
    title: 'Kot',
    description: 'Kot akrobata, łapie myszy od dzieciństwa',
    price: 360
  }),
  new Product({
    imagePath: 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn15.dlarodzinki.smcloud.net%2Ft%2Fphotos%2Ft%2F18190%2Fkrolik-dla-dziecka_397804.jpg&f=1',
    title: 'Królik',
    description: 'Dośc wstydliwy, nie lubi pokazywać twarzy',
    price: 120
  }),
  new Product({
    imagePath: 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn13.dlarodzinki.smcloud.net%2Ft%2Fphotos%2Ft%2F18115%2Fowczarek-niemiecki_396968.jpg&f=1',
    title: 'Owczrek',
    description: 'Upilnuje twoich owiec',
    price: 560
  })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}