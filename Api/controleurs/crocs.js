const data = require('../data.json');

// récup toutes les sneakers
exports.getCrocs = (req, res) => {
    const id = parseInt(req.params.id);
    const crocs = data.crocs;

    if(!crocs) {
        return res.status(404).send("crocs non trouver");
    } else {
        res.status(200).json({
            message: "crocs trouver",
            crocs
        });
    }
};

exports.getCrocsById = (req, res) => {
    const id = parseInt(req.params.id);
    const crocs = data.crocs;

    const croc = crocs.find(croc => croc.id === id);

    if(!croc) {
        return res.status(404).send("croc non trouver");
    } else {
        res.status(200).json({
            message: "croc trouver",
            croc : croc.name
        });
    }
};

