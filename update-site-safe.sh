#!/bin/bash

# Script seguro para actualizar JVERGARA sin credenciales
# Por: Dante - Agente de Diseño Web

echo "🚀 Actualizando JVERGARA con datos de configuración..."

# Leer archivo de configuración
CONFIG_FILE="config.json"

if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ Error: config.json no encontrado"
    exit 1
fi

# Extraer datos con jq
TELEFONO=$(jq -r '.contacto.telefono' "$CONFIG_FILE")
EMAIL=$(jq -r '.contacto.email' "$CONFIG_FILE")
LINKEDIN=$(jq -r '.contacto.linkedin' "$CONFIG_FILE")  
INSTAGRAM=$(jq -r '.contacto.instagram' "$CONFIG_FILE")
WHATSAPP=$(jq -r '.contacto.whatsapp' "$CONFIG_FILE")
HORARIO=$(jq -r '.contacto.horario' "$CONFIG_FILE")
UBICACION=$(jq -r '.contacto.ubicacion' "$CONFIG_FILE")

NOMBRE=$(jq -r '.empresa.nombre' "$CONFIG_FILE")
TITULO=$(jq -r '.empresa.titulo' "$CONFIG_FILE")
ANOS=$(jq -r '.empresa.anosExperiencia' "$CONFIG_FILE")
PROVEEDORES=$(jq -r '.empresa.proveedores' "$CONFIG_FILE")
RESTAURANTES=$(jq -r '.restaurantes' "$CONFIG_FILE")
DESCRIPCION=$(jq -r '.empresa.descripcion' "$CONFIG_FILE")
SLOGAN=$(jq -r '.empresa.slogan' "$CONFIG_FILE")

echo "✅ Datos extraídos:"
echo "   - $NOMBRE ($TITULO)"
echo "   - $PROVEEDORES proveedores, $RESTAURANTES restaurantes"
echo "   - Contacto: $TELEFONO, $EMAIL"

# Actualizar index.html
echo "📝 Actualizando index.html..."

# Reemplazar placeholders en el HTML
sed -i "s/+56 9 XXXX XXXX/$TELEFONO/g" index.html
sed -i "s/contacto@jvergara.cl/$EMAIL/g" index.html
sed -i "s/https:\/\/linkedin.com\/in\/arangelparra/$LINKEDIN/g" index.html
sed -i "s/https:\/\/wa.me\/56983006611/$WHATSAPP/g" index.html
sed -i "s/Lun - Fri: 9:00 - 18:00/$HORARIO/g" index.html
sed -i "s/Santiago, Chile/$UBICACION/g" index.html

# Actualizar datos de la empresa
sed -i "s/JVERGARA/$NOMBRE/g" index.html
sed -i "s/Un solo vendedor, múltiples proveedores, cero complejidad/$SLOGAN/g" index.html
sed -i "s/8+/$ANOS/g" index.html
sed -i "s/50+/$PROVEEDORES/g" index.html
sed -i "s/100+/$RESTAURANTES/g" index.html

echo "✅ Archivo index.html actualizado"
echo "⚠️  Manual: Sube el archivo index.html actualizado a GitHub"