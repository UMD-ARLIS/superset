/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { Dispatch } from 'redux';

export const LOG_EVENT = 'LOG_EVENT';

export function logEvent(eventName: string, eventData: Record<string, any>) {
  return (dispatch: Dispatch) =>
    dispatch({
      type: LOG_EVENT,
      payload: {
        eventName,
        eventData,
      },
    });
}

export function logMatomoEvent(
  eventCategory: string,
  eventAction: string,
  eventName: string,
  eventValue?: string | number,
) {
  if (!window?._paq) return;
  const eventLog: Array<string | number> = [
    'trackEvent',
    eventCategory,
    eventAction,
    eventName,
  ];
  if (eventValue) eventLog.push(eventValue);

  window._paq.push(eventLog);
}

export function buildBoundaries(e: Event) {
  const boundaries: string[] = [];

  let ele = e.target;
  while (ele) {
    if (ele instanceof HTMLElement) {
      if (ele.dataset && Object.keys(ele.dataset).includes('useraleBoundary')) {
        const boundary = ele.dataset.useraleBoundary;
        if (boundary) boundaries.unshift(boundary);
      }
      ele = ele.parentElement;
    } else {
      break;
    }
  }
  return boundaries;
}
