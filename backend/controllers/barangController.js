const Barang = require('../models/barang')
const Penempatan = require('../models/penempatan_ruangan')

controller = {}

controller.add_barang = async (req, res) => {
    try{
        const barang = await Barang.create({

        })
         const penempatan = await Penempatan.create({
            id_ruangan: req.body.id_ruangan,
            id_barang: barang.id,
            jumlah: req.body.jumlah
         })
    }catch (e){
        console.log(e)
    }
}