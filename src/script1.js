import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'


/**
 * Loaders
 */

const loadingBarElement = document.querySelector('.loading-bar')

let sceneReady = false
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () =>
    {
        // Wait a little
        window.setTimeout(() =>
        {
            // Animate overlay
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })

            // Update loadingBarElement
            loadingBarElement.classList.add('ended')
            loadingBarElement.style.transform = ''
        }, 500)

        window.setTimeout(() =>
        {
            sceneReady = true
        }, 2000)
    },

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) =>
    {
        // Calculate the progress and update the loadingBarElement
        const progressRatio = itemsLoaded / itemsTotal
        loadingBarElement.style.transform = `scaleX(${progressRatio})`
    }
)
const gltfLoader = new GLTFLoader(loadingManager)
const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)

/**
 * Base
 */
// Debug
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Overlay

const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    // wireframe: true,
    transparent: true,
    uniforms:
    {
        uAlpha: { value: 1 }
    },
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
})
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)
 */
/**
 * Update all materials

const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            // child.material.envMap = environmentMap
            child.material.envMapIntensity = debugObject.envMapIntensity
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}
 */
/**
 * Environment map
 
const environmentMap = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])

environmentMap.colorSpace = THREE.SRGBColorSpace

scene.background = environmentMap
scene.environment = environmentMap

debugObject.envMapIntensity = 2.5
*/


/**
 * Background
 */
const params = {
    color: '#ffffff'
};
scene.background = new THREE.Color( params.color );

/**
 * Models
 */


gltfLoader.load(
    '/models/Scenes/SceneOverview.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(1, 1, 1)
        gltf.scene.rotation.set(0,0,0)
        scene.add(gltf.scene)

        updateAllMaterials()
    }
)


/**
 * Points of interest
 */
const raycaster = new THREE.Raycaster()
const points = [
    {
        position: new THREE.Vector3(-0.7, 0.85, -0.3),
        element: document.querySelector('.point-0')
    }/**,
    {
        position: new THREE.Vector3(-0.25, 0.33, 0.4),
        element: document.querySelector('.point-1')
    },
    {
        position: new THREE.Vector3(-0.37, 0.3, 0.05),
        element: document.querySelector('.point-2')
    },
    {
        position: new THREE.Vector3(0.05, 0.35, -0.3),
        element: document.querySelector('.point-3')
    }*/
]

/** add line */
const line_material = new THREE.LineBasicMaterial({
	color: "black",
    linewidth: 65
});

const guidepoints = [];
guidepoints.push( new THREE.Vector3( -0.7, 0.6, -0.3 ) );
guidepoints.push( new THREE.Vector3( -0.7, 0.85, -0.3 ) );

const geom = new THREE.BufferGeometry().setFromPoints( guidepoints );

const line = new THREE.Line( geom, line_material );
scene.add( line );


/**
 * add cube


const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
const cube = new THREE.Mesh( geometry, material );
material.transparent = true 
material.opacity = 1
cube.position.x = 1
scene.add( cube );
//cube2
const geometry1 = new THREE.BoxGeometry( 1, 1, 1 ); 
const material1 = new THREE.MeshBasicMaterial( {color: 0x01ff01} ); 
const cube1 = new THREE.Mesh( geometry1, material1 );
material1.transparent = true 
material1.opacity = 1
cube1.position.x = 2
scene.add( cube1 );

const geometry2 = new THREE.BoxGeometry( 1, 1, 1 ); 
const material2 = new THREE.MeshBasicMaterial( {color: 0x01ff01} ); 
const cube2 = new THREE.Mesh( geometry2, material2 );
material2.transparent = true 
material2.opacity = 1
cube2.position.x = 3
scene.add( cube2 );
*/


//add morph
/*
gltfLoader.load(
    '/models/Morph.gltf',
    (gltf) =>
    {
        mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[0])

        action.play()

        gltf.scene.scale.set(5, 5, 5)
        scene.add(gltf.scene)

        updateAllMaterials()
    }
)
*/

/**
 * Lights

const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.castShadow = false
directionalLight.shadow.camera.far = 15
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 3, - 2.25)
scene.add(directionalLight)
 */

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
light.intensity = 30
scene.add( light );

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(-1, 1.5,  1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 3
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */


const tick = () =>
{
    // Update controls
    controls.update() 

    //update cube material

    /**
    if(document.getElementById("slider").value > 0.1 && document.getElementById("slider").value < 0.2){
        material.opacity = 1
    }
    else
    {
        material.opacity = 0
    }
    

    material.opacity = -1*Math.pow((document.getElementById("slider").value*5-3)**2,2)+1
    material1.opacity = document.getElementById("slider").value -1
    material2.opacity = document.getElementById("slider").value -2
    */

    // Update points only when the scene is ready
    if(sceneReady)
    {
        // Go through each point
        for(const point of points)
        {
            // Get 2D screen position
            const screenPosition = point.position.clone()
            screenPosition.project(camera)
    
            // Set the raycaster
            raycaster.setFromCamera(screenPosition, camera)
            const intersects = raycaster.intersectObjects(scene.children, true)

            point.element.classList.add('visible') //add this and comment out the if else so tags allways show
            
            /*
            // No intersect found
            if(intersects.length === 0)
            {
                // Show
                point.element.classList.add('visible')
            }

            // Intersect found
            else
            {
                // Get the distance of the intersection and the distance of the point
                const intersectionDistance = intersects[0].distance
                const pointDistance = point.position.distanceTo(camera.position)
    
                // Intersection is close than the point
                if(intersectionDistance < pointDistance)
                {
                    // Hide
                    point.element.classList.remove('visible')
                }
                // Intersection is further than the point
                else
                {
                    // Show
                    point.element.classList.add('visible')
                }
            }
            */
    
            const translateX = screenPosition.x * sizes.width * 0.5
            const translateY = - screenPosition.y * sizes.height * 0.5
            point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }
    }

    /*
    //update mixer
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previouseTime
    previouseTime = elapsedTime

    if(mixer !== null)
    {
        mixer.update(deltaTime)
    } 
    */

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

}

tick()