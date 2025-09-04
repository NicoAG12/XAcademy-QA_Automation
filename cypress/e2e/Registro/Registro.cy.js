
describe("Registro en XAcademy", () => {
//Hecho por Aguero Javier Nicolas
    const combinaciones = [
        
        [
  {
    nombre: "Fernando",
    apellido: "Fernandez",
    telefono: "3517896543",
    dni: "29384576",
    provincia: "Córdoba",
    localidad: "Villa María",
    mes_nacimiento: "abril",
    anio_nacimiento: "1992",
    dia_nacimiento: "12",
    mail: "fernando.fernandez92@gmail.com",
    password: "F3@rlA#92x!"
  },
  {
    nombre: "Diego",
    apellido: "Pereyra",
    telefono: "2996547832",
    dni: "34567891",
    provincia: "Neuquén",
    localidad: "Cutral Có",
    mes_nacimiento: "julio",
    anio_nacimiento: "1988",
    dia_nacimiento: "8",
    mail: "diego.pereyra88@gmail.com",
    password: "Diego_88!@#"
  },
  {
    nombre: "Valeria",
    apellido: "Lopez",
    telefono: "2239988776",
    dni: "40123456",
    provincia: "Buenos Aires",
    localidad: "Mar del Plata",
    mes_nacimiento: "octubre",
    anio_nacimiento: "1995",
    dia_nacimiento: "30",
    mail: "valeria.lopez95@gmail.com",
    password: "V@leriA30_95."
  },
  {
    nombre: "Martín",
    apellido: "Gonzalez",
    telefono: "3814567890",
    dni: "37891234",
    provincia: "Tucumán",
    localidad: "San Miguel de Tucumán",
    mes_nacimiento: "mayo",
    anio_nacimiento: "1983",
    dia_nacimiento: "5",
    mail: "martin.gonzalez83@gmail.com",
    password: "M4rtin_83$$"
  },
  {
    nombre: "Lucía",
    apellido: "Ramirez",
    telefono: "2613344556",
    dni: "42567890",
    provincia: "Mendoza",
    localidad: "Godoy Cruz",
    mes_nacimiento: "diciembre",
    anio_nacimiento: "1999",
    dia_nacimiento: "21",
    mail: "lucia.ramirez99@gmail.com",
    password: "Luc!a_99+21"
  }
]];

    const combinacionInvalida = {nombre: "Javier", apellido: "Fernandez", telefono: "3815683521", dni: "43234153", provincia: "Buenos Aires", localidad: "La Plata",mes_nacimiento : 'enero',anio_nacimiento: '1990',dia_nacimiento: '15',
        mail: "emailPrueba6@gmail.com",password:"Password12345."
        }

    it("Registro exitoso", () => {
        combinaciones.forEach((data)=>{
            cy.visit("https://ticketazo.com.ar/auth/registerUser");
            cy.get('[data-cy="input-nombres"]').type(data.nombre)
            cy.get('[data-cy="input-apellido"]').type(data.apellido)
            cy.get('[data-cy="input-telefono"]').type(data.telefono)
            cy.get('[data-cy="input-dni"]').type(data.dni)
            cy.get('[data-cy="select-provincia"]').type(`${data.provincia}{enter}`)
            cy.get('[data-cy="select-localidad"]').type(`${data.localidad}{enter}`)
            
            cy.get('[data-slot="selector-button"]').click().then(()=>{
             cy.get('[data-slot="header"]').click().then(()=>{
            cy.get('[data-slot="picker-month-list"]').then((meses)=>{
                cy.wrap(meses).contains(data.mes_nacimiento).click();
                cy.wait(500)
                ;
            }).then(()=>{
              cy.get('[data-slot="picker-year-list"]').then((años)=>{
                cy.wrap(años).contains(data.anio_nacimiento).click();
                cy.wait(500)
              });  
            })
        cy.get('[data-slot="header"]').click().then(()=>{
            cy.get('[data-slot="grid-body"] tr').each((fila)=>{
                cy.wrap(fila).find('td').each((celda) => {
                    const disabled = celda.attr("aria-disabled") === "true";
                    if(celda.text().trim() === data.dia_nacimiento && !disabled){
                        cy.wrap(celda).click();
                    }
                });
            })
        });
        })
     })
     cy.get('[data-cy="input-email"]').type(data.mail)
     cy.get('[data-cy="input-confirmar-email"]').type(data.mail)
     cy.get('[data-cy="input-password"]').type(data.password)
     cy.get('[data-cy="input-repetir-password"]').type(data.password)
     cy.wait(500)
     cy.get('[data-cy="btn-registrarse"]').click()
     cy.wait(6000)
        })
    });

    it("Registro fallido - Email ya registrado",(data = combinacionInvalida)=>{
         cy.visit("https://ticketazo.com.ar/auth/registerUser");
            cy.get('[data-cy="input-nombres"]').type(data.nombre)
            cy.get('[data-cy="input-apellido"]').type(data.apellido)
            cy.get('[data-cy="input-telefono"]').type(data.telefono)
            cy.get('[data-cy="input-dni"]').type(data.dni)
            cy.get('[data-cy="select-provincia"]').type(`${data.provincia}{enter}`)
            cy.get('[data-cy="select-localidad"]').type(`${data.localidad}{enter}`)
             cy.get('[data-slot="selector-button"]').click().then(()=>{
             cy.get('[data-slot="header"]').click().then(()=>{
            cy.get('[data-slot="picker-month-list"]').then((meses)=>{
                cy.wrap(meses).contains(data.mes_nacimiento).click();
                cy.wait(500)
                ;
            }).then(()=>{
              cy.get('[data-slot="picker-year-list"]').then((años)=>{
                cy.wrap(años).contains(data.anio_nacimiento).click();
                cy.wait(500)
              });  
            })
        cy.get('[data-slot="header"]').click().then(()=>{
            cy.get('[data-slot="grid-body"] tr').each((fila)=>{
                cy.wrap(fila).find('td').each((celda) => {
                    const disabled = celda.attr("aria-disabled") === "true";
                    if(celda.text().trim() === data.dia_nacimiento && !disabled){
                        cy.wrap(celda).click();
                    }
                });
            })
        });
        })
     })
           cy.get('[data-cy="input-email"]').type(data.mail)
     cy.get('[data-cy="input-confirmar-email"]').type(data.mail)
     cy.get('[data-cy="input-password"]').type(data.password)
     cy.get('[data-cy="input-repetir-password"]').type(data.password)
     cy.wait(500)
     cy.get('[data-cy="btn-registrarse"]').click().then(()=>{
            cy.get('[data-cy="error-message"]').should('be.visible').and('contain', 'Ya existe un usuario registrado con ese correo electrónico');
     cy.wait(6000)
     })

    })

});
