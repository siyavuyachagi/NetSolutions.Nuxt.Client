class JSONFormData {
  /**
   * Converts a JSON object to FormData
   * @param {Object} json - The JSON object to convert
   * @returns {FormData} - The resulting FormData object
   */
  static jsonToFormData(json: JSON) {
    const formData = new FormData();

    function appendFormData(data: any, parentKey = "") {
      if (data && typeof data === "object" && !(data instanceof File)) {
        Object.keys(data).forEach((key) => {
          appendFormData(data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
      } else {
        formData.append(parentKey, data);
      }
    }

    appendFormData(json);
    return formData;
  }

  /**
   * Converts a FormData object back to a JSON object
   * @param {FormData} formData - The FormData object to convert
   * @returns {Object} - The resulting JSON object
   */
  static formDataToJson(formData: FormData) {
    const jsonObject: Record<string, any> = {};

    formData.forEach((value, key) => {
      // Handle nested keys like "user[name]"
      const keys = key.match(/([^[\]]+)/g);
      let currentLevel: Record<string, any> = jsonObject;

      keys?.forEach((k, index) => {
        if (index === keys.length - 1) {
          currentLevel[k] = value;
        } else {
          currentLevel[k] = currentLevel[k] || {};
          currentLevel = currentLevel[k];
        }
      });
    });

    return jsonObject;
  }
}

export default JSONFormData;
